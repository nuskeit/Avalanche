import { I_Field } from "../../core/avalanche-app/root-diagram/diagram/element/field/domain";
import { FieldType } from "../../core/general/domain";
import { I_Presenter } from "../../core/general/presenter";

export class FieldPresenter implements I_Presenter<I_Field>{

	constructor(proxies: Proxies) {
		this.proxies = proxies
	}

	get dataTypeDef(): string {
		if (this.fieldProxy.dataTypeDef != null) {
			if (this.fieldProxy.dataTypeDef.refElement != null) {
				if (this.fieldProxy.fieldType == FieldType.Property)
					return this.fieldProxy.dataTypeDef.name + " (ref)"
			} else
				return this.fieldProxy.dataTypeDef.fallbackDataType
		}
		return ""
	}



	svgStyle = `
	.element-bg {
		position: relative;
	}
	
	.invalid {
		fill: red
	}
	
	.field-name {
		font-size: .7rem;
		filter: drop-shadow(.1em .1em .0em #000);
	}
	
	.field-name .field-param {
		font-style: italic;
		font-size: .7em;
		vertical-align: middle;
		fill: #ddd;
	}
	
	.field-name .field-datatype {
		fill: #cc9;
		font-size: .7rem;
	}
	`



	get presenterProxy(): FieldPresenter { return this.proxies.presenterProxy() }
	get fieldProxy(): I_Field { return this.proxies.fieldProxy() }

	proxies: Proxies;
	delegates: {} | undefined;
	eventsHandler: {} | undefined;
}


type Proxies = {
	fieldProxy(): I_Field
	presenterProxy(): FieldPresenter
}

