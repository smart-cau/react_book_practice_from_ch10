import React, { Component } from "react";
import styles from "./EditorPane.scss";
import classNames from "classnames/bind";

import CodeMirror from "codemirror";

import "codemirror/mode/markdown/markdown"; // 마크다운 문법 색상.
// 마크다운 내부에 들어가는 코드 색상
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/css/css";
import "codemirror/mode/shell/shell";

// CodeMirror를 위한 css 스타일
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

const cx = classNames.bind(styles);

/*  props로 EditorPaneContainer에서 다음의 내용을 받음.
    title={title}
    markdown={markdown}
    tags={tags}
    onChangeInput={handleChangeInput}
*/

class EditorPane extends Component {
  editor = null; // editor ref
  CodeMirror = null; // CodeMirror 인스턴스
  cursor = null; // 에디터의 텍스트 cursor 위치.

  initializeEditor = () => {
    // this.editor에 CodeMirror를 심음.
    this.CodeMirror = CodeMirror(this.editor, {
      mode: "markdown",
      theme: "monokai",
      lineNumbers: true, // 왼쪽에 라인 넘버 띄우기
      lineWrapping: true // 내용이 너무 길면 다음 줄에 작성.
    });
    // input 태그와는 달리, CodeMirror에 initializeEditor 함수가 호출될 때 onChange 이벤트를 .on 메소드를 써서 직접 등록함.
    this.CodeMirror.on("change", this.handleChangeMarkdown);
  };

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = e => {
    const { onChangeInput } = this.props;
    const { name, value } = e.target; // --> 이게 어떻게보면 핵심이라 할 수 있음. 기억해두자!
    onChangeInput({ name, value });
  };

  handleChangeMarkdown = doc => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor(); // 텍스트 cursor위치 저장. 뭔가 이것도 언젠가 도움될듯.. 기억!
    onChangeInput({
      name: "markdown",
      value: doc.getValue()
    });
  };

  // props로 받은 markdown 값을 CodeMirror 인스턴스에 반영해야 하기 때문에,
  // componentDidUpdate()에서 markdown 값을 바꾸면, setValue를 사용하여 내용을 변경해줌.
  componentDidUpdate(prevProps, prevState) {
    // markdown이 변경되면 에디터 값도 변경함
    // 이 과정에서 텍스트 커서의 위치가 초기화되기 때문에
    // 저장한 커서의 위치가 있으면 해당 위치로 설정함.
    if (prevProps.markdown !== this.props.markdown) {
      const { CodeMirror, cursor } = this;
      if (!CodeMirror) return; // CodeMirror 인스턴스가 아직 없을 때
      CodeMirror.setValue(this.props.markdown); // 있다면 변경내용을 set.
      if (!cursor) return; // 커서가 없을 때
      CodeMirror.setCursor(cursor); // 있다면 커서의 위치를 set.
    }
  }

  render() {
    const { handleChange } = this;
    const { tags, title } = this.props;
    // console.log(JSON.stringify(this.props)); //-- handleChange하고 검사용으로 꼭 넣어보자.

    return (
      <div className={cx("editor-pane")}>
        <input
          className={cx("title")}
          placeholder="제목을 입력하세요"
          name="title"
          value={title}
          onChange={handleChange}
        />
        {/* CodeMirror가 심어진 this.editor를 아래 div의 ref에 담아 다시 심는다. */}
        <div className={cx("code-editor")} ref={ref => (this.editor = ref)} />
        <div className={cx("tags")}>
          <div className={cx("description")}>Tag</div>
          <input
            name="tags"
            placeholder="태그를 입력하세요. (쉼표로 구분)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EditorPane;
