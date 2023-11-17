"use client";
import { NotificationStyled } from "./styles/notification-styled";

export const Notification = () => {
	// const { title, message, isOpen, type } = useSelector((state: Store) => state.notification);

	const title = "Success";
	const message = "Sua conta foi criada com sucesso";
	const type = "success";

	return (
		<NotificationStyled type={type}>
			<div className="top">
				<h1 className="title">{title}</h1>
				<button className="close">x</button>
			</div>

			<p className="message">{message}</p>
		</NotificationStyled>
	);
};
