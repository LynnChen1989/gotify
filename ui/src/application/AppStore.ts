import {BaseStore} from '../common/BaseStore';
import axios from 'axios';
import * as config from '../config';
import {action} from 'mobx';
import {SnackReporter} from '../snack/SnackManager';
import {IApplication} from '../types';

export class AppStore extends BaseStore<IApplication> {
    public onDelete: () => void = () => {};

    public constructor(private readonly snack: SnackReporter) {
        super();
    }

    protected requestItems = (): Promise<IApplication[]> => {
        return axios
            .get<IApplication[]>(`${config.get('url')}application`)
            .then((response) => response.data);
    };

    protected requestDelete = (id: number): Promise<void> => {
        return axios.delete(`${config.get('url')}application/${id}`).then(() => {
            this.onDelete();
            return this.snack('应用已删除');
        });
    };

    @action
    public uploadImage = async (id: number, file: Blob): Promise<void> => {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(`${config.get('url')}application/${id}/image`, formData, {
            headers: {'content-type': 'multipart/form-data'},
        });
        await this.refresh();
        this.snack('应用图片已更新');
    };

    @action
    public update = async (id: number, name: string, description: string): Promise<void> => {
        await axios.put(`${config.get('url')}application/${id}`, {name, description});
        await this.refresh();
        this.snack('应用已更新');
    };

    @action
    public create = async (name: string, description: string): Promise<void> => {
        await axios.post(`${config.get('url')}application`, {name, description});
        await this.refresh();
        this.snack('应用已创建');
    };

    public getName = (id: number): string => {
        const app = this.getByIDOrUndefined(id);
        return id === -1 ? '消息列表' : app !== undefined ? app.name : 'unknown';
    };
}
