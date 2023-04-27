import * as Sentry from "@sentry/node";

type CaptureMessageInput = {
	user?: CurrentUser;
	body?: Record<string, any>;
	message?: string;
	level?: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';
};

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	release: process.env.VERSION || '0.0.0',
});

export const captureMessageWithRequestBody = (props: CaptureMessageInput) => {
	if (process.env.ENV !== 'production') {
		return;
	}
	if (props.user) {
		Sentry.setUser({
			username: props?.user.code,
			email:  props?.user.email
		});
	}
	Sentry.setExtra('body', props.body);
	props.message && Sentry.captureMessage(props.message, props.level || 'error');
};
