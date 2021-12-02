import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
	selector: "base-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	constructor(private http: HttpClient) { }
	title = "pengaelusmessengerclient";
	postId: any;
	params0 = {}
	params1 = { channel: "elandon" }
	params2 = { username: "elandon", message: "test" }
	params3 = { channel: "elandon" }
	params4 = { channel: "elandon" }
	actions = ["Get all channels", "Get all messages in channel", "Send new message in channel", "Update channel (TBA)", "Delete channel (TBA)"]
	url = "http://73.19.65.35:3500/api/channel/";
	selected: number = 0;

	switchMenu(val: string) { this.selected = parseInt(this.actions.indexOf(val).toString()); }
	setOutput(res: Object) { document.getElementById("output")!.innerText = JSON.stringify(res, null, "|   "); }

	gac() { this.http.get(this.url).subscribe(res => this.setOutput(res)) }
	gamic() { this.http.get(this.url + document.getElementsByTagName("input")[0].value).subscribe(res => this.setOutput(res)) }
	snmic() { this.http.post(this.url + document.getElementsByTagName("input")[1].value, { username: document.getElementsByTagName("input")[1].value, message: document.getElementsByTagName("input")[0].value }).subscribe(res => this.setOutput(res)) }
	uc() { this.http.patch(this.url + document.getElementsByTagName("input")[0].value, { name: "general" }).subscribe(res => this.setOutput(res)) }
	dc() { this.http.delete(this.url + document.getElementsByTagName("input")[0].value).subscribe(res => this.setOutput(res)) }
}
