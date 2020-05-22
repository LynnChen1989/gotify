import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import React, {Component} from 'react';

interface IProps {
    fClose: VoidFunction;
    fOnSubmit: (name: string, description: string) => void;
}

interface IState {
    name: string;
    description: string;
}

export default class AddDialog extends Component<IProps, IState> {
    public state = {name: '', description: ''};

    public render() {
        const {fClose, fOnSubmit} = this.props;
        const {name, description} = this.state;
        const submitEnabled = this.state.name.length !== 0;
        const submitAndClose = () => {
            fOnSubmit(name, description);
            fClose();
        };
        return (
            <Dialog
                open={true}
                onClose={fClose}
                aria-labelledby="form-dialog-title"
                id="app-dialog">
                <DialogTitle id="form-dialog-title">创建一个应用</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        className="name"
                        label="应用名 *"
                        type="text"
                        value={name}
                        onChange={this.handleChange.bind(this, 'name')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        className="description"
                        label="简述"
                        value={description}
                        onChange={this.handleChange.bind(this, 'description')}
                        fullWidth
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={fClose}>取消</Button>
                    <Tooltip title={submitEnabled ? '' : 'name is required'}>
                        <div>
                            <Button
                                className="create"
                                disabled={!submitEnabled}
                                onClick={submitAndClose}
                                color="primary"
                                variant="contained">
                                创建
                            </Button>
                        </div>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        );
    }

    private handleChange(propertyName: string, event: React.ChangeEvent<HTMLInputElement>) {
        const state = this.state;
        state[propertyName] = event.target.value;
        this.setState(state);
    }
}
