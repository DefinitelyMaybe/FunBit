export type Asset = {
	id: number;
	el: HTMLElement | undefined;
	obj: any;
	src: string;
};

export class AssetClass {
	id: number;
	el: HTMLElement | undefined = $state();
	obj: any;
	src: string;
	constructor(args: Asset) {
		this.id = args.id;
		this.src = args.src;
		this.obj = args.obj;
	}
}
