# Geetshala

A Nepali song and lyrics library, built through the Web Technology with Django course.

## Running it locally

```bash
python3 -m venv myenv
source myenv/bin/activate        # Windows: myenv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

Then open <http://127.0.0.1:8000/songs/>.

## What works so far

- `/songs/` — the list of songs
- `/songs/<id>/` — one song's detail page

Data currently comes from a hardcoded list in `songs/views.py`. Unit 2 replaces it
with a database.