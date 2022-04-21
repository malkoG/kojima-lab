import type { NextPage } from 'next'

import React, { ReactEventHandler, useState, useEffect } from "react";

import tw from 'twin.macro';
import styled from '@emotion/styled';


const VideoUploaderContainer = styled.div`
	${tw`flex flex-col items-center justify-center text-center`}
`;

const VideoPlayerWrapper = styled.div`
	${tw`flex py-2 mx-auto justify-center cursor-pointer max-w-screen-sm`}

	video {
		width: 100%;
	}
`;

type VideoMetadataType = {
	width: number;
	height: number;
	resolution: string;
	duration: number;
}

type VideoPlayerProps = {
	src: string;
	setMetadata: (arg0: VideoMetadataType) => void;
}

const VideoPlayer = ({ src, setMetadata }: VideoPlayerProps) => {
	const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const wrapperElement: HTMLDivElement = e.currentTarget;
		const videoElement: HTMLMediaElement | null = wrapperElement.querySelector('video');
		if (!videoElement?.duration) return;

		console.log(wrapperElement);
		console.log(videoElement);

		if (videoElement.paused) {
			videoElement.play();
		} else {
			videoElement.pause();
		}
	}

	const onLoadedMetadata: ReactEventHandler<HTMLVideoElement> = (e) => {
		const video: HTMLVideoElement = e.currentTarget
		const metadata: VideoMetadataType = {
			width: video.videoWidth,
			height: video.videoHeight,
			resolution: `${video.videoWidth}x${video.videoHeight}`,
			duration: video.duration,
		};

		setMetadata({...metadata})
	}

	return (
		<VideoPlayerWrapper onClick={onClick}>
			{!!src && <video controls src={src} onLoadedMetadata={onLoadedMetadata} />}
		</VideoPlayerWrapper>
	)
}


const ScreenshotCaptureLab: NextPage = () => {
	const [src, setSrc] = useState<string>("");
	const [metadata, setMetadata] = useState<VideoMetadataType>({width: 0, height: 0, resolution: "", duration: 0});

	useEffect(() => {
		if (!!src) {
			const videoElement: HTMLMediaElement = document.querySelector('video') as HTMLMediaElement
			videoElement?.play();
		}
	}, [src])

	const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const file: File = e.target.files[0];

		const videoUrl = URL.createObjectURL(file);
		setSrc(videoUrl);
	}

	return (
		<VideoUploaderContainer>
			<input type="file" onChange={onUpload} accept="video/*" />
			<VideoPlayer src={src} setMetadata={setMetadata} />
			{!!metadata.resolution && (
				<div>
					<p>
						해상도 : {metadata.resolution}
					</p>
					<p>
						재생 시간 : {metadata.duration} 초
					</p>
				</div>
			)}
		</VideoUploaderContainer>
	);
};

export default ScreenshotCaptureLab;