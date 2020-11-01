import React from "react";
import PropTypes from "prop-types";

const camelize = function (str) {
  return str
    .split("_")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

const evtNames = [
  "click",
  "dblclick",
  "dragend",
  "mousedown",
  "mouseout",
  "mouseover",
  "mouseup",
  "recenter",
];

const wrappedPromise = function () {
  var wrappedPromise = {},
    promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
};

class HomeMarker extends React.Component {
  componentDidMount() {
    this.markerPromise = wrappedPromise();
    this.renderMarker();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map ||
      this.props.position !== prevProps.position ||
      this.props.icon !== prevProps.icon
    ) {
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.renderMarker();
    }
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  renderMarker() {
    const {
      map,
      google,
      position,
      mapCenter,
      icon,
      label,
      draggable,
      title,
      ...props
    } = this.props;
    if (!google) {
      return null;
    }

    let pos = position || mapCenter;
    if (!(pos instanceof google.maps.LatLng)) {
      pos = new google.maps.LatLng(pos.lat, pos.lng);
    }

    const pref = {
      map,
      position: pos,
      icon,
      label,
      title,
      draggable,
      ...props,
    };
    this.marker = new google.maps.Marker(pref);

    evtNames.forEach((e) => {
      this.marker.addListener(e, this.handleEvent(e));
    });

    this.markerPromise.resolve(this.marker);
  }

  getMarker() {
    return this.markerPromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`;
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    };
  }

  render() {
    return null;
  }
}
// eslint-disable-next-line
HomeMarker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object,
};
// eslint-disable-next-line
evtNames.forEach((e) => (HomeMarker.propTypes[e] = PropTypes.func));

HomeMarker.defaultProps = {
  name: "HomeMarker",
};

export default HomeMarker;
