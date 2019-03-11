/*class List extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            loading: true,
            cocktails: [],
        })
    }

    componentDidMount() {
        const cocktails = await fetchAllCocktails(type);
        this.setState({ cocktails, loading: false })
    }

    async filter(type) {
        this.setState({ loading: true });
        const filteredCocktails = await fetchCocktailsByType(type);
        this.setState({ loading: false, cocktails: filteredCocktails })
    }

    render() {
        const { cocktails } = this.state;

        return (
            <div>
                {loading && (
                    <div>Hleð kokteilum...</div>
                )}
                {!loading && (
                    <CocktailList cocktails={cocktails} />
                )}
                <button onClick={this.filter('gin')}>Gin</button>
            </div>
        )
    }
}
*/