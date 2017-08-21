import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styles from './app.scss';

const specs = {
  drop(props, monitor, component) {
    console.log(monitor.getInitialClientOffset());
    console.log(monitor.getInitialSourceClientOffset());
    console.log(monitor.getClientOffset());
    console.log(monitor.getDifferenceFromInitialOffset());
    console.log(monitor.getSourceClientOffset());
    return monitor.getDifferenceFromInitialOffset();
  }
};

@DropTarget("unit", specs, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
})
export class Territory extends Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <g id={this.props.name}>
        <path d={this.props.boundaries} />
      </g>
    );
  }
}

const source = {
  beginDrag(props) {
    console.log(arguments);
    return { okay: "ok" };
  },
  endDrag(props, monitor, component) {
    console.log(monitor.getItem());
    console.log(monitor.getDropResult());
    console.log(monitor.didDrop());
    if (!monitor.didDrop()) { return false; }
    var r = monitor.getDropResult();
    const el = ReactDOM.findDOMNode(component);
    el.setAttribute("style", `pointer-events: all; position:absolute; top: ${el.offsetTop + r.y}px; left: ${el.offsetLeft + r.x}px;`);
  }
};

@DragSource("unit", source, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})
@CSSModules(styles)
export class Piece extends Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(<div id="42" className="unit" styleName={this.props.name}></div>);
  }
}

@DragDropContext(HTML5Backend)
@CSSModules(styles)
class App extends Component {
  render() {
    return (
      <div styleName="app">
        <div styleName="board">
          <svg width="1980px" height="2975px">
            <Territory name="shipbreaker-bay" boundaries="M1449.68,1944.7C1447.88,1975.39 1422.42,1999.72 1391.28,1999.72C1358.97,1999.72 1332.77,1973.52 1332.77,1941.21C1332.77,1934.15 1334.02,1927.39 1336.31,1921.13L1242.02,1798.6C1223.14,1790.7 1232.5,1785.39 1254.71,1781.25L1264.46,1781.25L1322.54,1698.66L1465.52,1698.66L1465.52,1944.7L1449.68,1944.7ZM1146.98,1769.86C1142.46,1756.11 1157.41,1751.97 1185.97,1754.49L1187.5,1738.96L1225.71,1737.22C1226.61,1727.36 1234.21,1718.25 1248.48,1709.88C1239.07,1704.49 1236.48,1698.36 1237.01,1691.91C1249.62,1692.5 1260.01,1684.65 1268.21,1668.37C1265.64,1662 1267.01,1653.04 1272.3,1641.51L1268.88,1641.71C1275.4,1632.01 1283.25,1623.48 1295.26,1618.62C1300.25,1619.38 1305.15,1624.41 1310.01,1631.37C1311.33,1619.33 1318.13,1614.99 1330.42,1618.34C1327.53,1599.42 1329.64,1587.1 1342.75,1589.26C1347.02,1605.91 1354.34,1605.7 1364.72,1588.62C1373.94,1554.97 1391.18,1545.34 1413.92,1552.14C1445.68,1555.76 1474.08,1561.97 1496.82,1572.54L1498.86,2332.84L1497.66,2332.79L1497.85,2293.66C1465.49,2281.42 1446.46,2296.06 1413.01,2291.25C1372.88,2302.93 1378.13,2313.83 1349.7,2301.96C1335.73,2308.35 1322.36,2322.25 1313.21,2311.31L1313.11,2311.18C1299.05,2310.35 1292.61,2304.99 1289.63,2297.57C1286.11,2303.31 1282.79,2307.64 1279.7,2310.57L1273.25,2313.45L1270.76,2315.14C1268.06,2315.15 1265.59,2313.69 1263.35,2310.77C1254.78,2325.62 1245.72,2330.29 1235.56,2312.6L1228.03,2310.8C1230.49,2304.34 1231.83,2297.33 1231.83,2290.01C1231.83,2257.69 1205.64,2231.5 1173.33,2231.5C1141.32,2231.5 1115.32,2257.2 1114.83,2289.09C1084.82,2293.8 1079.52,2284.68 1098.94,2261.73C1074.86,2254.24 1074.03,2246.47 1096.46,2238.42C1105.11,2227.14 1115.14,2224.51 1126.56,2230.55L1136.44,2228.18C1135.53,2221.04 1139.48,2216.55 1148.27,2214.71C1154.55,2233.82 1161.23,2234.22 1168.3,2215.93L1176.56,2201.49L1174.69,2178.05L1186.19,2171.5C1179.6,2167.12 1177.66,2160.61 1180.37,2151.96C1168.04,2143.21 1161.04,2133.06 1159.38,2121.5C1156.32,2121.2 1153.43,2121.37 1150.85,2122.01L1150.78,2120.15C1166.52,2115 1179.05,2115.76 1188.56,2122.34L1217.53,2119.38C1214.51,2108.06 1220.05,2102.23 1234.14,2101.87C1220.82,2096.12 1217.28,2089.18 1235.26,2079.58C1224.31,2063.09 1228.02,2054.03 1246.4,2052.42L1236.86,2046.06C1222.54,2057.54 1211.88,2054.81 1204.91,2037.86C1202.63,2052.03 1192.67,2056.68 1175.03,2051.79C1181.81,2038.51 1177.79,2022.67 1168.87,2005.66L1196.99,2003.34C1191.9,1975.03 1223.62,1944.96 1237.86,1906.47C1226.33,1892.25 1218.07,1879.56 1209.92,1866.81L1208.32,1861.33C1211.06,1852.03 1198.99,1843.81 1188.15,1834.82C1169.4,1836.09 1162.3,1824.52 1165.74,1800.77C1167.67,1786.09 1161.73,1776.05 1147.93,1770.66L1146.98,1769.86Z" />
            <Territory name="kings-landing" boundaries="M1063.93,1872.91L1036.81,1879.53L973.385,1878.45C930.357,1861.14 895.138,1872.79 867.729,1913.39C865.959,1974.95 851.375,2018.97 868.814,2023.44C862.886,2069.32 867.405,2097.02 887.195,2098.15C900.062,2102.25 909.33,2108.57 914.999,2117.12L962.937,2122.43C1004.25,2095.49 1046.4,2065.95 1090.36,2030.68L1111.64,2005.09L1104.14,1977.3C1078.34,1988.78 1052.94,1995.78 1028.13,1996.24C1001.58,2012.72 981.448,2017.87 975.416,1998.1C956.576,2011.31 954.52,2005.16 969.249,1979.64C947.773,1960.93 954.395,1949.6 989.117,1945.65C1000.51,1932.94 1015.27,1926.39 1033.38,1926.01L1028.59,1942.44L1043.59,1931.02C1041.18,1908.08 1052.33,1897.02 1069.64,1891.34C1063.56,1885.61 1061.66,1879.46 1063.93,1872.91Z" />
          </svg>
        </div>
        <aside>
          <div styleName="iron-throne-token"></div>
          <div styleName="valyrian-steel-blade-token"></div>
          <div styleName="mensseger-raven-token"></div>
          <div styleName="wilding-threat-token"></div>
          <div styleName="round-marker"></div>
          { this.renderFactions() }
          <div>
            { this.renderGarrisons() }
          </div>
        </aside>
      </div>
    );
  }

  renderFactions() {
    const factions = [
      "baratheon",
      "lannister",
      "stark",
      "greyjoy",
      "tyrell",
      "martell"
    ];
    return factions.map(faction => {
      return (
        <div key={faction}>
          <Piece name={`${faction}-knight`} />
          <div styleName={`${faction}-influence-token`}></div>
          <div styleName={`${faction}-supply-token`}></div>
          <div styleName={`${faction}-victory-token`}></div>
          <div styleName={`${faction}-power-token`}></div>
          <div styleName={`${faction}-footman`}></div>
          <div styleName={`${faction}-knight`}></div>
          <div styleName={`${faction}-ship`}></div>
          <div styleName={`${faction}-siege-engine`}></div>
        </div>
      );
    });
  }

  renderGarrisons() {
    const garrisons = [
      "dragonstone",
      "highgarden",
      "lannisport",
      "pyke",
      "sunspear",
      "winterfell",
    ];

    return garrisons.map(garrison => {
      return (<div key={garrison} styleName={`garrison-${garrison}`}></div>);
    });
  }
}

export default App;
