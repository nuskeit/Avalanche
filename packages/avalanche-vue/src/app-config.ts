const config = (which: string): any => {
	switch (which) {
		case "prod":
			return {
				url: {
					API_BASE_URL: 'http://localhost:[PORT]'
				}
			};

		case "dev":
			return {
				url: {
					API_BASE_URL: 'http://localhost:8080/'
				}
			};
	}
}

export const getAppConfig = () => config('dev');
