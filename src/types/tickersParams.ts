export type GetQuoteParams = {
    ticker: string
}

export type GetCandlesParams = {
    symbol: string,
    resolution: 1 | 5 | 15 | 30 | 60 | "D" | "W" | "M",
    from: number,
    to: number
}