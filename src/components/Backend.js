// wrzucenie frontendu na githuba
// ale potrzebujemy klucza do autentykacji
// zeby byl ukryty w headerasach i jakos zarządzać tym
// polaczenie opcji z dzialaniem tj barColor -> zmieniajacy sie kolor slupkow
// ...dalej stworzenie kolejnej tabeli do przechowywania userow ktorych wybralismy do naszego wykresuS

import secret from '@/other/secret.json';

const MAIN_URL = secret['MAIN_URL'];

const createPath = (path, args={}) => {
  const questionMark = Object.keys(args).length > 0 ? '?' : '';
  const link = MAIN_URL + path + questionMark + Object.keys(args).map(argName => `${argName}=${args[argName]}`).join('&');
  return link
};
  

const fetchLinkGET = (path, onData, args) =>
  fetch(createPath(path, args), {
    method: "GET",
    headers: {"Token": secret['TOKEN']}
  })
    .then(response => response.json())
    .then(json => json.result)
    .then(result => onData(result))
    .catch(console.log);

const fetchLinkPOST = (path, onData, args) => {
  const actualPath = createPath(path);
  const body = JSON.stringify(args);

  fetch(actualPath, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Token": secret['TOKEN']},
    body: body
  })
    .then(response => response.json())
    .then(json => json.result)
    .then(result => onData(result))
    .catch(console.log);
}

export const addDatetime = (user_id, data, type, onData=null) =>
  fetchLinkGET('add_datetime', onData ? onData : _ => null, {user_id: user_id, data: data, type: type});

export const addSleepSatisfaction = (date_id, percent, onData=null) =>
  fetchLinkGET('add_sleep_satisfaction', onData ? onData : _ => null, {date_id: date_id, percent: percent});

export const addUser = (name, password, onData=null) =>
  fetchLinkGET('add_user', onData ? onData : _ => null, {name: name, password: password});

export const addUserOption = (user_id, name, value, onData=null) =>
  fetchLinkGET('add_user_option', onData ? onData : _ => null, {user_id: user_id, name: name, value: value});

export const createChartData = (user_id, unit, value_precision, onData=null) =>
  fetchLinkGET('create_chart_data', onData ? onData : _ => null, {user_id: user_id, unit: unit, value_precision: value_precision});

export const createChartDataForUsers = (user_ids, unit, value_precision, onData=null) =>
  fetchLinkGET('create_chart_data_for_users', onData ? onData : _ => null, {user_ids: user_ids, unit: unit, value_precision: value_precision});

export const createDatetimesForList = (user_id, type, onData=null) =>
  fetchLinkGET('create_datetimes_for_list', onData ? onData : _ => null, {user_id: user_id, type: type});

export const createDatetimeForList = (id, onData=null) =>
  fetchLinkGET('create_datetime_for_list', onData ? onData : _ => null, {id: id});

export const deleteDatetime = (id, onData=null) =>
  fetchLinkGET('delete_datetime', onData ? onData : _ => null, {id: id});

export const generateNote = (username, date_type, latest_date, onData=null) =>
  fetchLinkGET('generate_note', onData ? onData : _ => null, {username: username, date_type: date_type, latest_date: latest_date});

export const getAllOptions = (onData=null) =>
  fetchLinkGET('get_all_options', onData ? onData : _ => null, {});

export const getAllUsers = (onData=null) =>
  fetchLinkGET('get_all_users', onData ? onData : _ => null, {});

export const getDatetimes = (id, type, onData=null) =>
  fetchLinkGET('get_datetimes', onData ? onData : _ => null, {id: id, type: type});

export const getIdFromName = (name, onData=null) =>
  fetchLinkGET('get_id_from_name', onData ? onData : _ => null, {name: name});

export const getUserOptions = (user_id, onData=null) =>
  fetchLinkGET('get_user_options', onData ? onData : _ => null, {user_id: user_id});

export const nameExists = (name, onData=null) =>
  fetchLinkGET('name_exists', onData ? onData : _ => null, {name: name});

export const updateUserOptions = (user_id, options, onData=null) =>
  fetchLinkPOST('update_user_options', onData ? onData : _ => null, {user_id: user_id, options: options});

export const validateUser = (name, password, onData=null) =>
  fetchLinkGET('validate_user', onData ? onData : _ => null, {name: name, password: password});