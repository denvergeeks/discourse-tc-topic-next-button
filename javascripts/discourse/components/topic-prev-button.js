import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  prevTopicUrl,
  nextTopicUrl,
} from "discourse/lib/topic-list-tracker";
import DiscourseURL from "discourse/lib/url";
import { inject as service } from "@ember/service";

export default class TopicPrevButton extends Component {
  @service site;
  @tracked label = "";
  @tracked showButton = false;
  @tracked prevURL = "";

  constructor(owner, args) {
    super(owner, args);
    prevTopicUrl().then((url) => {
      if (url) {
        this.showButton = true;
        this.prevURL = url;
      } else {
        this.showButton = false;
        this.prevURL = "";
      }
    })
  };

  get goFirst() {
    return settings.topic_prev_always_go_to_first_post
  }

  @action
  goToPrevTopic() {
    let url;
    if (this.prevURL) {
      url = this.goFirst
        ? this.nextURL.substring(0, this.prevURL.lastIndexOf("/"))
        : this.prevURL;
      DiscourseURL.routeTo(url);
    }
  };
}
