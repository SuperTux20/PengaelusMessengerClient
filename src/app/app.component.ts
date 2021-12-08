// Commented out code is an attempt at disabling the submit button if the input was invalid

import { Component/*, OnInit*/ } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
	selector: "base-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent/* implements OnInit*/ {
	constructor(private http: HttpClient) { }
	postId: any;
	title = "pengaelusmessengerclient";
	params = [{}, { channel: "" }, { username: "", message: "" }, { channel: "" }, { channel: "" }]
	actions = ["Get all channels", "Get all messages in channel", "Send new message in channel", "Update channel (TBA)", "Delete channel"]
	url = "http://73.19.65.35:3500/api/channel/";
	selected = 0;
	formContent = {}

	switchMenu(val: string) { this.selected = parseInt(this.actions.indexOf(val).toString()); }
	setOutput(res: Object) { document.getElementById("output")!.innerText = JSON.stringify(res, null, "| "); }
	setInput(idx: number = 0, val: string = "") { document.getElementsByTagName("input")[idx].value = val; }
	getInput = (idx = 0) => document.getElementsByTagName("input")[idx].value;
	// inputHandler(e: any) { document.querySelector("button")!.disabled = (this.getInput() == "") ? false : true; }
	thefunction() {
		switch (this.selected) {
			case 0:
				this.http.get(this.url).subscribe(res => this.setOutput(res));
				break;
			case 1:
				this.http.get(this.url + this.getInput()).subscribe(res => this.setOutput(res));
				this.setInput();
				break;
			case 2:
				this.http.post(this.url + this.getInput(1), { username: this.getInput(1), message: this.getInput() }).subscribe(res => this.setOutput(res));
				this.setInput();
				break;
			case 3:
				this.http.patch(this.url + this.getInput(), [{ username: "dummy", message: "test" }]).subscribe(res => this.setOutput(res));
				this.setInput();
				break;
			case 4:
				this.http.delete(this.url + this.getInput()).subscribe(res => this.setOutput(res));
				this.setInput();
				break;
		}
	}
	// ngOnInit() { let boxes = document.getElementsByTagName("input"); try { for (let idx = 0; idx < boxes.length; idx++) { boxes[idx].addEventListener("input", this.inputHandler); } } catch { } }
}
