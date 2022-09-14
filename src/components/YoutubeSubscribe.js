import React, { Component } from "react";
import PropTypes from "prop-types";

//channel id
import { CHANNEL_ID } from "../helpers/environment";
import "./styles/YoutubeSubscribe.css";

export default class YouTubeSubscribe extends Component {
  static propTypes = {
    channelName: PropTypes.string,
    channelid: PropTypes.string.isRequired,
    theme: PropTypes.string,
    layout: PropTypes.string,
    count: PropTypes.string,
  };

  static defaultProps = {
    channelName: "Straight Up Bourbon",
    channelid: CHANNEL_ID,
    theme: "default",
    layout: "default",
    count: "hidden",
  };

  constructor(props) {
    super(props);
    this.youtubeSubscribeNode = React.createRef();

    // To render components economically w/o repetition
    this.state = {
      initialized: false,
    };
  }

  initialized() {
    this.setState({
      initialized: true,
    });
  }

  componentDidMount() {
    if (this.state.initialized) {
      return;
    }

    // Make <script src="https://apis.google.com/js/platform.js" ></script>
    const youtubescript = document.createElement("script");
    youtubescript.src = "https://apis.google.com/js/platform.js";
    this.youtubeSubscribeNode.current.parentNode.appendChild(youtubescript);
    this.initialized();
  }

  render() {
    const { theme, layout, count, channelName, channelid } = this.props;

    return (
      <div
        id="youtube-btn"
        ref={this.youtubeSubscribeNode}
        className="g-ytsubscribe"
        data-theme={theme}
        data-layout={layout}
        data-count={count}
        data-channel={channelName}
        data-channelid={channelid}
      />
    );
  }
}
