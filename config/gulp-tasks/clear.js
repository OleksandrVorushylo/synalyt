import del from "del";

export function clear() {
    return del(app.path.buildFolder);
}
