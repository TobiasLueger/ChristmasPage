import preact from 'preact';
import Item from './Item';

import { componentClass } from './DiseaseApp';

class ItemList extends preact.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  }

  render() {
    if (this.props.diseases.length === 0) {
      return(
        <p class={`${componentClass}__no-result`}>
          {document.querySelector('#disease-filter').getAttribute('data-noresult')}
        </p>
      );
    }

    let render = [];
    this.state.letters.map(letter => {
      const letterFiltered = this.props.diseases.filter(x => x.name.charAt(0) === letter);
      if (letterFiltered.length > 0) {
        render.push(<li class={`${componentClass}__category`}>{letter}</li>);
        letterFiltered.map(x => {
          if (x.url) {
            render.push(<Item name={x.name} link={x.url}></Item>);
          } else {
            render.push(<Item name={x.name} layer={x.html}></Item>);
          }
        });
      }
    });

    return(
      <ul class={`${componentClass}__list`}>
        {render.map(x => x)}
      </ul>
    );
  }
}

export default ItemList;