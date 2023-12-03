import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  previousTopicUrl,
  nextTopicUrl,
} from "discourse/lib/topic-list-tracker";
import DiscourseURL from "discourse/lib/url";
import { inject as service } from "@ember/service";

export default class TopicPreviousButton extends Component {
  @service site;
  @tracked label = "";
  @tracked showButton = false;
  @tracked previousURL = "";

  constructor(owner, args) {
    super(owner, args);
    previousTopicUrl().then((url) => {
      if (url) {
        this.showButton = true;
        this.previousURL = url;
      } else {
        this.showButton = false;
        this.previousURL = "";
      }
    })
  };

  get goFirst() {
    return settings.topic_next_always_go_to_first_post
  }

  @action
  goToPreviousTopic() {
    let url;
    if (this.previousURL) {
      url = this.goFirst
        ? this.previousURL.substring(0, this.nextURL.lastIndexOf("/"))
        : this.previousURL;
      DiscourseURL.routeTo(url);
    }
  };
}
