import preact from 'preact';

import { componentClass } from './DiseaseApp';

class SearchField extends preact.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onInputChange(event.target.value);
  }

  render() {
    return(
      <div class={`${componentClass}__searchfield-wrapper`}>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-lg-10 offset-lg-1">
              <p class="util-h5">{document.querySelector('#disease-filter').getAttribute('data-headline')}</p>
              <input
                class={`${componentClass}__searchfield`}
                placeholder={document.querySelector('#disease-filter').getAttribute('data-copytext')}
                type="text"
                value={this.props.value}
                onInput={this.handleChange}>
              </input>
              {this.props.value ? <span onClick={this.props.onInputClear} class={`${componentClass}__clearsearch  util-icon--after util-icon--close`}></span> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchField;