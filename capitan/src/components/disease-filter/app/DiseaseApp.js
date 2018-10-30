import preact from 'preact';
import SearchField from './Searchfield';
import ItemList from './ItemList';
import Filter from './Filter';

export const componentClass = 'disease-filter';

class App extends preact.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLetterFilter = this.handleLetterFilter.bind(this);
    this.updateFilteredList = this.updateFilteredList.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.state = {
      searchInput: '',
      letterFilter: '', 
      diseaseList: [], 
      filteredList: []
    };
  }

  componentDidMount() {
    fetch(document.querySelector('#disease-filter').getAttribute('data-api'))
      .then(res => res.json())
      .then(response => {
        this.setState({diseaseList: response, filteredList: response});
        document.querySelector('.' + componentClass).classList.remove('util-spinner');
      })
      .catch(error => console.error('Error:', error));
  }

  handleSearchChange(value) {
    this.setState({searchInput: value});
    this.updateFilteredList();
  }

  handleLetterFilter(value) {
    this.setState({letterFilter: value});
    this.updateFilteredList();
  }

  updateFilteredList() {
    let result = this.state.diseaseList;
    result = result.filter(disease => disease.name.toLowerCase().includes(this.state.searchInput.toLowerCase()));
    if (this.state.letterFilter.length > 0) {
      result = result.filter(disease => disease.name.toLowerCase().charAt(0) === this.state.letterFilter.toLowerCase());
    }
    this.setState({ filteredList: result });
  }

  clearSearch() {
    this.setState({searchInput: ''});
    this.updateFilteredList();
  }

  render() {
    return(
      <div class={`${componentClass} util-spinner`}>
        <SearchField value={this.state.searchInput} onInputChange={this.handleSearchChange} onInputClear={this.clearSearch} />
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-lg-10 offset-lg-1">
              <Filter
                diseases={this.state.diseaseList.filter(disease => disease.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))}
                onFilterChange={this.handleLetterFilter}
                searchHasInput={this.state.searchInput.length > 0}
                activeFilter={this.state.letterFilter}
                />
              <ItemList diseases={this.state.filteredList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;