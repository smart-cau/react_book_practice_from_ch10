import CounterList from "../components/CounterList";
// actions 내에 파일들이 많은데, 따로 언급을 안해주면 actions라는 dir 내에 있는 모든 것들에 접근 가능한거?
import * as actions from "../actions";
import getRandomColor from "../lib/getRandomColor";
import { connect } from "react-redux";

const mapStateToProps = state => ({ counters: state.counters });

const mapDispatchToProps = dispatch => ({
  onIncrement: index => dispatch(actions.increment(index)),
  onDecrement: index => dispatch(actions.decrement(index)),
  onSetColor: index => {
    const color = getRandomColor();
    dispatch(actions.setColor({ index, color }));
  }
});

const CounterListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterList);

export default CounterListContainer;
