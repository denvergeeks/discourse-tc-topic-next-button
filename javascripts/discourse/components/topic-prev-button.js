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
  @tracked lastURL = "";

  constructor(owner, args) {
    super(owner, args);
    previousTopicUrl().then((url) => {
      if (url) {
        this.showButton = true;
        this.lastURL = url;
      } else {
        this.showButton = false;
        this.lastURL = "";
      }
    })
  };

  get goFirst() {
    return settings.topic_next_always_go_to_first_post
  }

  @action
  goToPreviousTopic() {
    let url;
    if (this.lastURL) {
      url = this.goFirst
        ? this.previousURL.substring(0, this.lastURL.lastIndexOf("/"))
        : this.lastURL;
      DiscourseURL.routeTo(url);
    }
  };
}
