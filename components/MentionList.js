import React from "react";

export class MentionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown({ event }) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      this.props.command({ id: item });
    }
  }

  render() {
    return (
      <div className="bg-white overflow-hidden text-sm font-medium border rounded shadow-sm divide-y divide-gray-200">
        {this.props.items.map((item, index) => (
          <button
            className={`w-full appearance-none text-left p-2 hover:bg-gray-200 flex items-center space-x-1 ${
              index === this.state.selectedIndex ? "bg-gray-200" : ""
            }`}
            key={index}
            onClick={() => this.selectItem(index)}
          >
            <img
              src="https://praveenjuge.com/images/praveen-juge-photo.jpg"
              className="h-4 w-4 rounded-full"
            />
            <span>{item}</span>
          </button>
        ))}
      </div>
    );
  }
}
