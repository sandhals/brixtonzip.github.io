package main

import (
	"html/template"
	"net/http"
	"curius"
)

func main() {
	http.HandleFunc("/", handleCuriusSaves)
	http.ListenAndServe(":8080", nil)
}

func handleCuriusSaves(w http.ResponseWriter, r *http.Request) {
	allCuriusSaves, err := curius.GetAllCuriusSaves()
	if err != nil {
		http.Error(w, "Error fetching Curius saves", http.StatusInternalServerError)
		return
	}

	tmpl, err := template.New("index").ParseFiles("index.html")
	if err != nil {
		http.Error(w, "Error parsing HTML template", http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, allCuriusSaves)
	if err != nil {
		http.Error(w, "Error executing HTML template", http.StatusInternalServerError)
		return
	}
}
