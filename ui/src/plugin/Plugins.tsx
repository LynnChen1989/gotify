import React, {Component, SFC} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Settings from '@material-ui/icons/Settings';
import {Switch, Button} from '@material-ui/core';
import DefaultPage from '../common/DefaultPage';
import ToggleVisibility from '../common/ToggleVisibility';
import {observer} from 'mobx-react';
import {inject, Stores} from '../inject';
import {IPlugin} from '../types';

@observer
class Plugins extends Component<Stores<'pluginStore'>> {
    public componentDidMount = () => this.props.pluginStore.refresh();

    public render() {
        const {
            props: {pluginStore},
        } = this;
        const plugins = pluginStore.getItems();
        return (
            <DefaultPage title="插件列表" maxWidth={1000}>
                <Grid item xs={12}>
                    <Paper elevation={6}>
                        <Table id="plugin-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>启用</TableCell>
                                    <TableCell>名字</TableCell>
                                    <TableCell>Token</TableCell>
                                    <TableCell>详情</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {plugins.map((plugin: IPlugin) => {
                                    return (
                                        <Row
                                            key={plugin.token}
                                            id={plugin.id}
                                            token={plugin.token}
                                            name={plugin.name}
                                            enabled={plugin.enabled}
                                            fToggleStatus={() =>
                                                this.props.pluginStore.changeEnabledState(
                                                    plugin.id,
                                                    !plugin.enabled
                                                )
                                            }
                                        />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </DefaultPage>
        );
    }
}

interface IRowProps {
    id: number;
    name: string;
    token: string;
    enabled: boolean;
    fToggleStatus: VoidFunction;
}

const Row: SFC<IRowProps> = observer(({name, id, token, enabled, fToggleStatus}) => (
    <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>
            <Switch
                checked={enabled}
                onClick={fToggleStatus}
                className="switch"
                data-enabled={enabled}
            />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>
            <ToggleVisibility value={token} style={{display: 'flex', alignItems: 'center'}} />
        </TableCell>
        <TableCell align="right" padding="none">
            <Link to={'/plugins/' + id}>
                <Button>
                    <Settings />
                </Button>
            </Link>
        </TableCell>
    </TableRow>
));

export default inject('pluginStore')(Plugins);
