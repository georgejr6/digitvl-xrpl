import datetime
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from .models import Action


def create_action(user, verb, target=None, verb_id=None):
    # check for any similar action made in the last minute
    now = timezone.now()
    last_minute = now - datetime.timedelta(seconds=60)
    similar_actions = Action.objects.filter(user_id=user.id,
                                            verb=verb,
                                            verb_id=verb_id,
                                            created__gte=last_minute)
    if target:
        target_ct = ContentType.objects.get_for_model(target)
        similar_actions = similar_actions.filter(
            target_ct=target_ct,
            target_id=target.id)
    if not similar_actions:
        # no existing actions found
        action = Action(user=user, verb=verb, target=target, verb_id=verb_id)

        action.save()
        return True
    return False


def delete_action(target, target_id):
    # delete action from feed table
    target_ct = ContentType.objects.get_for_model(target)

    delete_all_actions_target_null = Action.objects.filter(target_ct=target_ct, target_id=target_id)
    print(delete_all_actions_target_null)
    delete_all_actions_target_null.delete()
