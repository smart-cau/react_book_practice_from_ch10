/*  에디터로 작성한 마크다운을 HTML로 변환하여 화면에 띄우는 Comp.
    /editor(글 작성)와 /list(포스트를 볼 떄)도 사용 가능.
    marked를 사용하여 markdown을 html로 변환하고, 이를 렌더링.
*/
/*  PreviewPaneContainer -> PreviePane -> MarkdownRender로 'markdown' props가 전달됨. 

    여기 Comp에 전반적으로 이해가 안가는 부분이 많음 -- 질문.
*/
import React, { Component } from "react";
import styles from "./MarkdownRender.scss";
import classNames from "classnames/bind";

import marked from "marked"; // 대체 marked란 무엇인가.. --질문

// prism 관련 코드 불러오기
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
// 지원할 코드 형식들을 불러옵니다
// http://prismjs.com/#languages-list 참조
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-css.min.js";

const cx = classNames.bind(styles);

class MarkdownRender extends Component {
  state = {
    html: ""
  };

  renderMarkdown = () => {
    const { markdown } = this.props;
    if (!markdown) {
      this.setState({
        html: ""
      });
      return;
    }

    this.setState({
      html: marked(markdown, {
        breaks: true, // 일반 엔터로 새 줄 입력
        sanitize: true // markdown 내부 html 무시
      })
    });
  };

  // constructor(props) --> state의 초기값을 설정하는 방법 중 하나. 82p 참고.
  constructor(props) {
    super(props);
    const { markdown } = props;
    // 서버사이드 렌더링에서도 마크다운 처리가 되도록  constructor 쪽에서도 구현. 설명: 552p 이해x -- 기억!
    this.state = {
      html: markdown
        ? marked(props.markdown, { breaks: true, sanitize: true })
        : ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // markdown 값이 변경되면, renderMarkdown을 호출.
    if (prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown();
    }
    // state가 바뀌면, 코드 하이라이팅.
    if (prevState.html !== this.state.html) {
      Prism.highlightAll();
    }
  }

  render() {
    const { html } = this.state;

    // React에서 html을 렌더링 하려면, 객체를 만들어서 내부에
    // __html 값을 설정해야한다.
    const markup = {
      __html: html
    };
    // 그리고 그 값을 dangerouslySetInnerHTML에 해당 객체를 넣어주면 된다.
    return (
      <div className={cx("markdown-render")} dangerouslySetInnerHTML={markup} />
    );
  }
}

export default MarkdownRender;
