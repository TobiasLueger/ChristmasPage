import preact from 'preact';

import { componentClass } from './DiseaseApp';

class Item extends preact.Component {
  constructor(props) {
    super(props);
    this.openLayer = this.openLayer.bind(this);
  }

  openLayer() {
    $.fancybox.open(this.props.layer);
  }

  render() {
    if (this.props.layer) {
      return(
        <li class={`${componentClass}__item`}>
          <a href="#" onClick={this.openLayer} class="util-icon--after util-icon--arrow-right">{this.props.name}</a>
        </li>
      );
    } else {
      return(
        <li class={`${componentClass}__item`}>
          <a href={this.props.link} class="util-icon--after util-icon--arrow-right">{this.props.name}</a>
        </li>
      );
    }
  }
}

export default Item;