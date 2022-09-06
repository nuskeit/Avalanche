import * as avalancheApp from "../../avalanche-app";

export class AppConfigAmbient implements avalancheApp.domain.I_AppConfigAmbient {
	currentAmbient: string

	constructor(currentAmbient: string) {
		this.currentAmbient = currentAmbient
	}

	getApiConfig(): avalancheApp.domain.I_AppConfig {
		switch (this.currentAmbient) {
			case "prod":
				return {
					url: {
						API_BASE_URL: 'http://localhost:[PORT]'
					}
				};

			default:
				return {
					url: {
						API_BASE_URL: 'http://localhost:8080/'
					}
				};
		}
	}
}

