import { StyledForm } from './styles/styledForm';
import { useState } from 'react';
import produce from 'immer';
import { IFormProps, LoginFields } from './interfaces/forms';
import { Field } from './field';
import { useNotification } from '@/utils/useNotification';
import { useQueriesUser } from './hooks/useQueriesUser';
import { Loading } from '@/components/loading';
import { useRouter } from 'next/router';
import { storageKeys } from '@/interfaces/interfaceStorageKeys';

export const Login = ({ props: { setFormName } }: IFormProps) => {
	const defaultValues = { email: '', password: '' };
	const [formValues, setFormValues] = useState({ fields: defaultValues, errors: defaultValues });
	const { loadingLogin, requestLogin } = useQueriesUser();
	const { sendNotification } = useNotification();
	const router = useRouter();

	const changeValue = (newValue: string, fieldName: string) => {
		const newState = produce(formValues, (draft) => {
			if (!newValue) draft.errors[fieldName as LoginFields] = 'Este campo não pode ficar vazio';
			else draft.errors[fieldName as LoginFields] = '';

			draft.fields[fieldName as LoginFields] = newValue;
		});

		setFormValues(newState);
	};

	const validateValues = () => {
		const fields = Object.entries(formValues.fields);
		const errors: typeof defaultValues = { email: '', password: '' };
		let hasError = false;

		fields.forEach(([key, value]) => {
			if (!value) {
				errors[key as keyof typeof errors] = `Este campo não pode ficar vazio`;
				hasError = true;
			}
		});

		return { hasError, errors };
	};

	const showErrors = (errors: typeof defaultValues) => {
		const newState = produce(formValues, (draft) => {
			draft.errors = errors;
		});

		setFormValues(newState);
	};

	const login = async (e: React.FormEvent) => {
		e.preventDefault();

		const { hasError, errors } = validateValues();
		if (hasError) return showErrors(errors);

		const { email, password } = formValues.fields;
		const { data, token, error } = await requestLogin({ email, password });
		if (error) return sendNotification('Erro', error);

		const storageUser = { email, token };
		localStorage.setItem(storageKeys.user, JSON.stringify(storageUser));

		sendNotification('Sucesso', data!);
		router.reload();
	};

	return (
		<StyledForm>
			{loadingLogin && <Loading />}
			<h1 role="title" className="title">
				Login
			</h1>

			<form onSubmit={(e) => login(e)}>
				<Field
					props={{
						name: 'email',
						type: 'text',
						placeholder: 'Email',
						error: formValues.errors.email,
						value: formValues.fields.email,
						changeValue,
					}}
				/>

				<Field
					props={{
						name: 'password',
						type: 'password',
						placeholder: 'Senha',
						error: formValues.errors.password,
						value: formValues.fields.password,
						changeValue,
					}}
				/>

				<button>Entrar</button>
			</form>

			<button role="change-form" onClick={() => setFormName('create')} className="change-form">
				Não tem uma conta? Clique aqui para criar.
			</button>
		</StyledForm>
	);
};
