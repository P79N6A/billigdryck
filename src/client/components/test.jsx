import React from 'react';
import Button from '@material-ui/core/Button';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            hello: ['hello']
        };
    }
    componentDidMount() {
        const that = this;
        // const d = await fetch('http://localhost:3000/delta/latest')
        fetch('http://localhost:3000/products/1')
            .then(res => res.json())
            .then(json => this.setState({ hello: json }));
    }
    render() {
        console.log(this.state.hello)
        return (
            <div>

                <div>
                    {
                        (this.state.hello || []).map((m,i) => <div key={i}>{JSON.stringify(m)}</div>)
                    }
                </div>;
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            </div>
        )
    }
}

  export default Test;