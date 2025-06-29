import json
from django.utils import timezone
from django.db.models import F
from django.http import (
    HttpResponseRedirect,
    JsonResponse
)
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.db.models import Count

from .models import Choice, Question

class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        """
        Excludes any future and without choices questions.
        """
        return Question.objects.annotate(num_choices=Count('choice')) \
            .filter(pub_date__lte=timezone.now(), num_choices__gt=0) \
            .order_by('-pub_date')[:10]

class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"

    def get_queryset(self):
        """
        Excludes any future and without choices questions.
        """
        return Question.objects.annotate(num_choices=Count('choice')) \
            .filter(pub_date__lte=timezone.now(), num_choices__gt=0)

class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"

    def get_queryset(self):
        """
        Excludes any future and without choices questions.
        """
        return Question.objects.annotate(num_choices=Count('choice')) \
            .filter(pub_date__lte=timezone.now(), num_choices__gt=0)

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        if request.headers.get("x-requested-with") == "XMLHttpRequest":
            return JsonResponse({"error": "No choice selected."}, status=400)
        return render(
            request,
            "polls/detail.html",
            {"question": question, "error_message": "You didn't select a choice."},
        )

    selected_choice.votes = F("votes") + 1
    selected_choice.save()

    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        updated = [
            {"id": c.id, "text": c.choice_text, "votes": c.votes}
            for c in question.choice_set.all()
        ]
        return JsonResponse({"results": updated})

    return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
    

class SinglePageAppView(generic.ListView):
    model = Question
    template_name = "polls/single_page.html"
    context_object_name = "questions"

    def get_queryset(self):
        return (
            Question.objects
                    .annotate(num_choices=Count("choice"))
                    .filter(pub_date__lte=timezone.now(),
                            num_choices__gt=0)
                    .order_by("-pub_date")
        )

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        # Build a dict: { question_id: json-string-of-choices }
        ctx["choices_map"] = {
            q.id: json.dumps([
                {"id": c.id, "text": c.choice_text, "votes": c.votes}
                for c in q.choice_set.all()
            ])
            for q in ctx["questions"]
        }
        return ctx