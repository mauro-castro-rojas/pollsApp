from django.urls import path

from . import views

app_name = "polls"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"), # ex: /polls/
    path("<int:pk>/", views.DetailView.as_view(), name="detail"), # ex: /polls/5/
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"), # ex: /polls/5/results/
    path("<int:question_id>/vote/", views.vote, name="vote"), # ex: /polls/5/vote/
    path("chart/", views.SinglePageAppView.as_view(), name="chart")
]