
type selectData = {
  selected: string,
  selectedVal: string,
  expanded: boolean,
  setFocus: boolean,
}

type singleOption = {
  value: string,
  label: string,
  selected ?: boolean,
}

type appData = {
  options: singleOption[],
}
