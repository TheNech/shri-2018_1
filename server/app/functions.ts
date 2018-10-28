import { allowTypes } from '../config';

export function getFormatedTime(ms: number): string {
    // 1 s = 1000 ms
    let sec: number = ms / 1000;
    
    let hours: number = sec / 3600  % 24;
    let minutes: number = sec / 60 % 60;
    let seconds: number = sec % 60;

    return num(hours) + ":" + num(minutes) + ":" + num(seconds);
}

function num(value: number): string | number {
    value = Math.floor(value);
    return value < 10 ? '0' + value : value;
}

export function isTypeCorrect(types: string[]): boolean {
    for(let i = 0; i < types.length; i++) {
        if(!allowTypes.includes(types[i])) {
            return false;
        }
    }

    return true;
}

interface IDataObject {
    events: object[]
}
interface IValueObject {
    type: string
}

export function filterDataByType(data: IDataObject, type: string[]): object {
    let filteredData: object[] = [];
    filteredData = data.events.filter((value: IValueObject) => allowTypes.includes(value.type));
    
    return { events: filteredData };
}