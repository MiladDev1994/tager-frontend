
import { RecoilState, atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const directoryState = atom({
    key: 'directoryState',
    default: {
        baseDirectory: "",
        count: "1"
    },
    effects_UNSTABLE: [persistAtom],
})

export const userNameState = atom({
    key: 'userNameState',
    default: "",
    effects_UNSTABLE: [persistAtom],
})

export const ModeState = atom({
    key: 'ModeState',
    default: {
        route: "",
        mode: "",
    },
    effects_UNSTABLE: [persistAtom],
})

export const UserState = atom({
    key: 'UserState',
    default: {},
    effects_UNSTABLE: [persistAtom],
})

export const userTagSelectState: RecoilState<string> = atom({
    key: "userTagSelectState",
    default: "",
});


export const AllRecordLength: RecoilState<number> = atom({
    key: "AllRecordLength",
    default: 0,
});

export const Index: RecoilState<number> = atom({
    key: "Index",
    default: 0,
});

export const DirectoryState = atom({
    key: "DirectoryState",
    default: {
        path: "",
        mode: ""
    },
    effects_UNSTABLE: [persistAtom],
});


