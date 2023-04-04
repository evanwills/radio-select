
export type selectData = {
  expanded: boolean,
  selected: singleOption | null,
  selectedKey: number,
  setFocus: boolean,
  shift: boolean
}

export type singleOption = {
  label: string,
  selected ?: boolean,
  value: string,
}

export type appData = {
  options: singleOption[],
}
