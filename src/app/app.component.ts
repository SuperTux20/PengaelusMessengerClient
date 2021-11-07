import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
	selector: 'base-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'pengaelusmessengerclient';
	games = [{
		title: "Succubus with a Gun",
		desc: "Samirah is on a mission to become the queen of Hell, and she's not afraid to kill any who stand in her way."
	}, {
		title: "Space Cadet NEO",
		desc: "A classic reborn! Built from the ground up, Space Cadet NEO is a faithful recreation of the original 3D Pinball for Windows that you know and love, except it's for ALL platforms this time!"
	}, {
		title: "Epic RPG",
		desc: "A simple RPG that doesn't have a world map."
	}]

	links = [{
		name: "Penagelus Gaming",
		url: "."
	}, {
		name: "GitHub",
		url: "https://github.com/SuperTux20"
	}, {
		name: "YouTube",
		url: "https://www.youtube.com/channel/UCBAQbC6vCewEtfAflsbueXA"
	}, {
		name: "Personal Website",
		url: "https://supertux20.github.io"
	}]

	about = "Pengaelus Gaming is dedicated to only bringing you the best that one developer can provide."
}
