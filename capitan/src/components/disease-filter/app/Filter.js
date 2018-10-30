import preact from 'preact';

import { componentClass } from './DiseaseApp';

const letters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z'
];
class Filter extends preact.Component {
	constructor(props) {
		super(props);
	}

	handleClick(event, value) {
		this.props.activeFilter === value
			? this.props.onFilterChange('')
			: this.props.onFilterChange(value);
	}

	handleReset(event) {
		this.props.onFilterChange('');
	}

	render() {
		const activeArr = [];
		letters.forEach(letter => {
			const letterFiltered = this.props.diseases.filter(
				x => x.name.charAt(0) === letter
			);
			if (letterFiltered.length > 0) {
				activeArr.push(letter);
			}
		});

		return (
			<ul
				class={
					this.props.searchHasInput
						? `${componentClass}__filter has-searchinput`
						: `${componentClass}__filter`
				}
			>
				<li
					class={
						`${componentClass}__filter-link ${componentClass}__filter-link--reset` +
						(this.props.activeFilter === '' ? ' active' : '')
					}
					href="#"
					onClick={e => this.handleReset(e)}
				>
					{document
						.querySelector('#disease-filter')
						.getAttribute('data-reset')}
				</li>
				{letters.map(letter => (
					<li
						class={
							(activeArr.includes(letter)
								? `${componentClass}__filter-link`
								: `${componentClass}__filter-link--disabled`) +
							(this.props.activeFilter === letter
								? ' active'
								: '')
						}
						onClick={
							activeArr.includes(letter)
								? e => this.handleClick(e, letter)
								: ''
						}
					>
						{letter}
					</li>
				))}
			</ul>
		);
	}
}

export default Filter;
