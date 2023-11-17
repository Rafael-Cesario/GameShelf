"use client";
import { useDispatch, useSelector } from "react-redux";
import { NotificationStyled } from "./styles/notification-styled";
import { Store } from "@/context/store";
import { setCloseNotification } from "@/context/notification-slice";

export const Notification = () => {
	const { title, message, isOpen, type } = useSelector((state: Store) => state.notification);
	const dispatch = useDispatch();

	if (!isOpen) return null;

	return (
		<NotificationStyled type={type} data-cy="notification">
			<div className="top">
				<h1 className="title">{title}</h1>

				<button className="close" onClick={() => dispatch(setCloseNotification())}>
					x
				</button>
			</div>

			<p className="message">{message}</p>
		</NotificationStyled>
	);
};
