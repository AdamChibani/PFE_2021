
export const SET_DATA = '[Assistance] Set data';
export const ADD_DATA = '[Assistance] Add data';
export const UPDATE_DATA = '[Assistance] Update data';
export const SET_SEARCH_WORD = '[Assistance] Set search text';
export const SELECT_ITEM_IN_DATATABLE = '[Assistance] Select an item in data table';
export const SET_SUBMITTABLE = '[Assistance] Change canSubmit state';
export const UPDATE_FORM_DATA = '[Assistance] Update form';
export const SET_LOADING = '[Assistance] Loading';
export const SET_EDITABLE = '[Assistance] Set Editable';
export const DELETE_ITEM = '[Assistance] Delete an item';

export function setData(data) {
	if (!data) {
		data = [];
	}
	return {
		type: SET_DATA,
		payload: data
	};
}

export function updateData(item) {
	return {
		type: UPDATE_DATA,
		payload: item
	};
}

export function addData(item) {
	return {
		type: ADD_DATA,
		payload: item
	};
}

export function setSearchText(value) {
	return {
		type: SET_SEARCH_WORD,
		payload: value
	};
}

export function setSubmittable(submittable) {
	return {
		type: SET_SUBMITTABLE,
		payload: Boolean(submittable),
	}
}

export function updateFormData(data) {
	return {
		type: UPDATE_FORM_DATA,
		payload: data,
	}
}

export function setLoading(isLoading) {
	return {
		type: SET_LOADING,
		payload: Boolean(isLoading),
	}
}

export function setEditable(isEditable) {
	return {
		type: SET_EDITABLE,
		payload: isEditable
	}
}

export function deletePackage(id) {
	return {
		type: DELETE_ITEM,
		payload: id
	}
}