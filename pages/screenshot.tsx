import type { NextPage } from 'next'

import React, { useState, useEffect } from "react";

import tw from 'twin.macro';
import styled from '@emotion/styled';


const VideoPlayerWrapper = styled.div`
	${tw`cursor-pointer`}
`;

type VideoPlayerProps = {
	src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
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

	return (
		<VideoPlayerWrapper onClick={onClick}>
			{!!src && <video src={src} />}
		</VideoPlayerWrapper>
	)
}


const ScreenshotCaptureLab: NextPage = () => {
	const [src, setSrc] = useState<string>("");
	const [duration, setDuration] = useState<number>(0);

	useEffect(() => {
		if (!!src) {
			const videoElement: HTMLMediaElement = document.querySelector('video') as HTMLMediaElement
			videoElement?.play();
			setDuration(videoElement.duration);
		}
	}, [src])

	const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const file: File = e.target.files[0];

		const videoUrl = URL.createObjectURL(file);
		setSrc(videoUrl);
	}

	return (
		<div>
			<input type="file" onChange={onUpload} />
			<VideoPlayer src={src} />
			<p>
				재생 시간 : {duration} 초
			</p>
		</div>
	);
};

export default ScreenshotCaptureLab;