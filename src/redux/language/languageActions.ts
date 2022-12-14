export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "zh" | "en";
}

interface addLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: { name: string; code: string };
}

export type LanguageActionTypes = ChangeLanguageAction | addLanguageAction;

export const changeLanguageActionCreator = (
  language: "zh" | "en"
): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
};

export const addLanguageActionCreator = (
  name: string,
  code: string
): addLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  };
};
