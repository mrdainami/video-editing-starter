"""Build vibe graphics: inline assets/vibe/vibe.css into every src/*.html -> compositions/*.html.
HyperFrames only applies styles that sit inside the component's <template>, so shared CSS is inlined.
Font URLs are rewritten to project-root paths (assets/vibe/fonts/...)."""
import pathlib, re
here = pathlib.Path(__file__).parent
css = (here / "assets/vibe/vibe.css").read_text().replace('url("fonts/', 'url("assets/vibe/fonts/')
(here / "compositions").mkdir(exist_ok=True)
for src in sorted((here / "src").glob("*.html")):
    out = src.read_text().replace("/*VIBE_CSS*/", "\n" + css)
    (here / "compositions" / src.name).write_text(out)
    print("built", src.name)


def make_instance(component_id: str, instance_id: str) -> pathlib.Path:
    """A component can only be mounted once per video under its own id.
    For a second use, make a renamed copy: compositions/<instance_id>.html."""
    src = here / "compositions" / f"{component_id}.html"
    out = here / "compositions" / f"{instance_id}.html"
    out.write_text(src.read_text().replace(f'"{component_id}"', f'"{instance_id}"'))
    return out


if __name__ == "__main__":
    import sys
    args = sys.argv[1:]
    if len(args) == 3 and args[0] == "--instance":
        print("instance", make_instance(args[1], args[2]).name)
