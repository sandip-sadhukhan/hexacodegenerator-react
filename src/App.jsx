import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, CssBaseline, Container, Slider, Grid, Paper } from '@material-ui/core';

import { CopyToClipboard } from 'react-copy-to-clipboard';

const App = () => {

    const [value, setValue] = useState(16);
    const [hexacode, setHexacode] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateHexacode();
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const generateHexacode = () => {
        let hexas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        let result = '';
        for (let i = 0; i < value; i++) {
            result += hexas[Math.floor(Math.random() * hexas.length)];
        }
        setHexacode(result);
        setCopied(false);
    }

    const hexFormat = (hexacode) => {
        let format = '';
        for(let i=0;i<hexacode.length;i++){
            format += hexacode[i];
            if((i+1)%4===0 && i!==0 && i!==(hexacode.length - 1)){
                format += '-';
            }
        }
        return format;
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h5">Hexa Code Generator</Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container maxWidth="sm" style={{ marginTop: '50px' }}>
                    <Typography variant="h3" align="center">How Many Digits?</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Slider value={value} style={{ marginTop: '50px' }} onChange={handleChange}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={32} />
                        </Grid>
                    </Grid>

                    <Typography variant="h5" align="center" gutterBottom>{value}</Typography>
                    <Grid container justify="center">
                        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={generateHexacode}>
                            Generate
                        </Button>
                    </Grid>
                    <Paper style={{ marginTop: '20px', padding: '10px' }}>
                        <Typography variant="h5" align="center">{hexFormat(hexacode)}</Typography>
                    </Paper>
                    
                    <Grid container justify="center">
                        <CopyToClipboard text={hexacode}
                            onCopy={() => setCopied(true)}>
                            <Button variant="text" color="primary" style={{ marginTop: '20px' }}>
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        </CopyToClipboard>

                    </Grid>
                </Container>

            </main>
        </>
    );
}

export default App;