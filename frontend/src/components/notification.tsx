"use client";

import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { StyledNotification } from "./styles/styled-notification";
import { setNotificationClose } from "@/context/notification-slice";

export const Notification = () => {
	const { isOpen, message, title, type } = useSelector((state: Store) => state.notification);
	const dispatch = useDispatch();

	if (!isOpen) return null;

	return (
		<StyledNotification type={type}>
			<div className="top">
				<h1 className="title">{title}</h1>
				<button className="close" onClick={() => dispatch(setNotificationClose())}>
					x
				</button>
			</div>

			<p className="message">{message}</p>
		</StyledNotification>
	);
};
