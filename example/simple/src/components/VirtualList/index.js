import React from "react";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";
import { List as VList } from "react-virtualized/dist/commonjs/List";
// import { CellMeasurerCache, CellMeasurer } from "react-virtualized/dist/commonjs/CellMeasurer";
// import { List } from "react-virtualized";

export default class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.vList = React.createRef();
    this.state = {
      list: props.list || [],
      heights: []
    };
  }
  handleHeightReady = (height, index) => {
    const heights = [...this.state.heights];
    heights.push({
      index,
      height
    });
    this.setState(
      {
        heights
      },
      this.vList.current.recomputeRowHeights(index)
    );
  };
  getRowHeight = ({ index }) => {
    const { heights = [] } = this.state;
    const row = heights.find(item => item.index === index);
    return row ? row.height : 200;
  };
  renderRow = ({ index, key, style }) => {
    const { Item, list = [] } = this.props;
    return (
      <div key={key} style={style}>
        <Item item={list[index]} />
      </div>
    );
  };
  render() {
    const { list = [], Item, heights } = this.props;
    // const { Item = {}, width, height } = this.props;
    // const renderItem = ({ index, key, style }) => {
    //   if (heights.find(item => item.index === index)) {
    //     return (
    //       <div key={key} style={style}>
    //         <Item item={list[index]} />
    //       </div>
    //     );
    //   }
    //   return (
    //     <div key={key} style={style}>
    //       <ReactHeight
    //         onHeightReady={height => {
    //           this.handleHeightReady(height, index);
    //         }}
    //       >
    //         <div key={key} style={style}>
    //           <Item item={list[index]} />
    //         </div>
    //       </ReactHeight>
    //     </div>
    //   );
    // };
    const renderItem = ({ index, key, style }) => {
      return <Item key={key} item={list[index]} style={style}></Item>;
    };
    // return <List {...this.props} rowRenderer={this.renderRow} />;
    return (
      <div style={{ height: 667 - 45 }}>
        <AutoSizer>
          {({ width, height }) => (
            <VList
              ref={this.vList}
              width={width}
              height={height}
              overscanRowCount={10}
              rowCount={list.length}
              rowHeight={190}
              rowRenderer={renderItem}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}
