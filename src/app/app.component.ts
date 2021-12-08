// Commented out code is an attempt at disabling the submit button if the input was invalid

import { Component/*, OnInit*/ } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
@Component({
	selector: "base-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent/* implements OnInit*/ {
	constructor(private http: HttpClient) { }
	postId: any;
	title = "pengaelusmessengerclient";
	params = [[], ["channel"], ["channel", "username", "message"], ["channel"], ["channel"]]
	actions = ["Get all channels", "Get all messages in channel", "Send new message in channel", "Update channel (TBA)", "Delete channel"]
	url = "http://73.19.65.35:3500/api/channel/";
	selected = 0;
	formContent = {}

	switchMenu(val: string) { this.selected = parseInt(this.actions.indexOf(val).toString()); }
	setInput(idx: number = 0, val: string = "") { document.getElementsByTagName("input")[idx].value = val; }
	getInput = (idx = 0) => document.getElementsByTagName("input")[idx].value;
	handleHttpError = (err: HttpErrorResponse) => (err.status == 404) ? `Channel ${this.getInput(1)} not found` : (err.status == 400) ? "Cannot send empty message" : err
	setOutput(res: any) {
		let true_output = ""
		let output = []
		if (typeof res[0] === typeof String()) { output = res; output[0].replace(/,/g, "\n") }
		else {
			try {
				for (let message of res) {
					let split_msg = []
					for (let line of Object.keys(message)) split_msg.push(message[line]);
					output.push(`${split_msg[0]} --- ${new Date(split_msg[3])}\n"${split_msg[1]}"\n\n`);
				}
			} catch (TypeError) {
				let split_msg = []
				for (let line of Object.keys(res)) split_msg.push(res[line]);
				output.push((split_msg.length == 1) ? `${split_msg[0]}` : `${split_msg[0]} --- ${new Date(split_msg[3])}\n"${split_msg[1]}"\n\n`);
			}
		}
		true_output = JSON.stringify(output)
		document.getElementById("output")!.innerText = (true_output.includes("\\n")) ? true_output.replace(/\\n/g, "\n").replace(/","/g, "").replace(/\\"/g, "\"").slice(2, -3) : (true_output.charAt(0) == '"') ? true_output.replace(/","/g, "\n").slice(1, -1) : true_output.replace(/","/g, "\n").slice(2, -2);
	}
	// inputHandler(e: any) { document.querySelector("button")!.disabled = (this.getInput() == "") ? false : true; }
	thefunction() {
		switch (this.selected) {
			case 0:
				this.http.get(this.url).subscribe(res => this.setOutput(res));
				break;
			case 1:
				this.http.get(this.url + this.getInput()).subscribe(res => this.setOutput(res), err => this.setOutput(this.handleHttpError(err)));
				this.setInput();
				break;
			case 2:
				this.http.post(this.url + this.getInput(), { username: this.getInput(1), message: this.getInput(2) }).subscribe(res => this.setOutput(res), err => this.setOutput(this.handleHttpError(err)));
				this.setInput();
				break;
			case 3:
				this.http.patch(this.url + this.getInput(), [{ username: "dummy", message: "test", id: null, created_on: null, updated_on: null }]).subscribe(res => this.setOutput(res), err => this.setOutput(this.handleHttpError(err)));
				this.setInput();
				break;
			case 4:
				this.http.delete(this.url + this.getInput()).subscribe(res => this.setOutput(res), err => this.setOutput(this.handleHttpError(err)));
				this.setInput();
				break;
		}
	}
	// ngOnInit() { let boxes = document.getElementsByTagName("input"); try { for (let idx = 0; idx < boxes.length; idx++) { boxes[idx].addEventListener("input", this.inputHandler); } } catch { } }
}
