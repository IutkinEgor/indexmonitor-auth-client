export class TimestampConverter{

    public static fromMilliseconds(timestamp: number ): string{
        var date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        console.log("window.navigator.language" + window.navigator.language)
        return new Intl.DateTimeFormat(window.navigator.language, options).format(date)
    }

    public static fromSeconds(timestamp: number ): string{
        return this.fromMilliseconds(timestamp*1000);
    }
}